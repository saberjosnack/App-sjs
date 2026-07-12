// SJS POS — Service Worker (نسخة تحديث تلقائي)
// كل ما ترفع index.html جديد، غيّر رقم النسخة هون تحت (CACHE_NAME) وبيتحدث تلقائيًا عند كل الأجهزة
const CACHE_NAME = 'sjs-pos-v2'; // ⚠️ زيّد الرقم (v3, v4...) كل ما تعمل تحديث كبير
const OFFLINE_URLS = ['./', './index.html'];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // يفعّل النسخة الجديدة فورًا بدون انتظار إغلاق كل التبويبات
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS).catch(()=>{}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim()) // ياخد تحكم فوري بكل الصفحات المفتوحة
  );
});

// الاستراتيجية: الشبكة أولاً دايمًا (عشان يجيب آخر تحديث)، ولو مقطوع الإنترنت يرجع للنسخة المحفوظة
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(()=>{});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
