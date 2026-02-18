import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc as firestoreAddDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// ── Firebase config (Vite 환경변수) ──
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── Helper: Firestore 문서 추가 ──
export const addDocument = async (
  collectionName: string,
  data: Record<string, unknown>,
) => {
  const docRef = await firestoreAddDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef;
};

// ── Helper: 실시간 구독 (createdAt 오름차순) ──
export const subscribeToCollection = (
  collectionName: string,
  callback: (items: any[]) => void,
) => {
  const q = query(
    collection(db, collectionName),
    orderBy('createdAt', 'asc'),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        ...d,
        id: doc.id,
        // createdAt 를 문자열로 변환
        timeAgo: d.createdAt instanceof Timestamp
          ? formatTimeAgo(d.createdAt.toDate())
          : '방금 전',
      };
    });
    callback(items);
  });

  return unsubscribe;
};

// ── 시간 포맷 유틸 ──
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}
