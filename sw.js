// Service Worker: プッシュ通知の受信イベント
self.addEventListener('push', function(event) {
  let data = { title: 'SleepPulse AI', body: '今日も忘れずに、睡眠計測をしましょう！' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3094/3094132.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3094/3094132.png',
    vibrate: [100, 50, 100],
    data: {
      url: './index.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知タップ時の挙動（アプリを開く）
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data.url || './');
    })
  );
});
