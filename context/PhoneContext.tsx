import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PhoneData } from '../types';
import { defaultPhone } from '../data/defaultPhone';
import { getUserPhones, savePhone, deletePhone as deletePhoneFromStorage, createEmptyPhone, getLastPhoneId, setLastPhoneId } from '../lib/phoneStorage';

// 이전 기본 폰 오버라이드 데이터 정리 (마이그레이션)
try { localStorage.removeItem('dingle-default-overrides'); } catch { /* ignore */ }

interface PhoneContextType {
  // 폰 목록
  allPhones: PhoneData[];

  // 현재 선택된 폰
  currentPhone: PhoneData | null;
  currentPhoneId: string | null;
  selectPhone: (id: string) => void;

  // 폰 CRUD
  createPhone: (name: string, theme: string) => PhoneData;
  updateCurrentPhone: (updates: Partial<PhoneData>) => void;
  removePhone: (id: string) => void;

  // 앱 데이터 업데이트 (편집 시)
  updateAppData: <K extends keyof PhoneData['apps']>(appId: K, data: PhoneData['apps'][K]) => void;

  // 현재 폰이 편집 가능한지
  isEditable: boolean;

  // 목록으로 돌아가기
  goToList: () => void;
}

const PhoneContext = createContext<PhoneContextType | null>(null);

export function PhoneProvider({ children }: { children: ReactNode }) {
  const [userPhones, setUserPhones] = useState<PhoneData[]>(() => getUserPhones());
  const [currentPhoneId, setCurrentPhoneId] = useState<string | null>(() => {
    const lastId = getLastPhoneId();
    if (lastId) {
      const allPhonesInit = [defaultPhone, ...getUserPhones()];
      const found = allPhonesInit.find((p) => p.id === lastId);
      if (found) return lastId;
    }
    return defaultPhone.id;
  });

  // 기본 딩글폰은 항상 코드에 정의된 데이터 그대로 사용 (편집 불가)
  const allPhones = [defaultPhone, ...userPhones];
  const currentPhone = currentPhoneId
    ? allPhones.find((p) => p.id === currentPhoneId) || null
    : null;

  // 기본 딩글폰은 편집 불가
  const isEditable = currentPhone ? !currentPhone.isDefault : false;

  const selectPhone = useCallback((id: string) => {
    setCurrentPhoneId(id);
    setLastPhoneId(id);
  }, []);
  const goToList = useCallback(() => setCurrentPhoneId(null), []);

  const createPhone = useCallback(
    (name: string, theme: string) => {
      const phone = createEmptyPhone(name, theme);
      setUserPhones((prev) => [...prev, phone]);
      savePhone(phone);
      setCurrentPhoneId(phone.id);
      setLastPhoneId(phone.id);
      return phone;
    },
    [],
  );

  const updateCurrentPhone = useCallback(
    (updates: Partial<PhoneData>) => {
      if (!currentPhoneId) return;
      // 기본 폰은 수정 불가
      if (currentPhoneId === defaultPhone.id) return;

      setUserPhones((prev) => {
        const idx = prev.findIndex((p) => p.id === currentPhoneId);
        if (idx < 0) return prev;
        const updated = { ...prev[idx], ...updates };
        const newPhones = [...prev];
        newPhones[idx] = updated;
        savePhone(updated);
        return newPhones;
      });
    },
    [currentPhoneId],
  );

  const updateAppData = useCallback(
    <K extends keyof PhoneData['apps']>(appId: K, data: PhoneData['apps'][K]) => {
      if (!currentPhoneId) return;
      // 기본 폰은 수정 불가
      if (currentPhoneId === defaultPhone.id) return;

      setUserPhones((prev) => {
        const idx = prev.findIndex((p) => p.id === currentPhoneId);
        if (idx < 0) return prev;
        const phone = prev[idx];
        const updated: PhoneData = {
          ...phone,
          apps: { ...phone.apps, [appId]: data },
        };
        const newPhones = [...prev];
        newPhones[idx] = updated;
        savePhone(updated);
        return newPhones;
      });
    },
    [currentPhoneId],
  );

  const removePhone = useCallback(
    (id: string) => {
      deletePhoneFromStorage(id);
      setUserPhones((prev) => prev.filter((p) => p.id !== id));
      if (currentPhoneId === id) {
        setCurrentPhoneId(null);
      }
    },
    [currentPhoneId],
  );

  return (
    <PhoneContext.Provider
      value={{
        allPhones,
        currentPhone,
        currentPhoneId,
        selectPhone,
        createPhone,
        updateCurrentPhone,
        removePhone,
        updateAppData,
        isEditable,
        goToList,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
}

export function usePhone(): PhoneContextType {
  const ctx = useContext(PhoneContext);
  if (!ctx) throw new Error('usePhone must be used inside PhoneProvider');
  return ctx;
}
