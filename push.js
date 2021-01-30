var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BFpPS9VhxH8sJOJl-XxqRQCBEoE_X005e7PPc4t-J0nYVyFW4s_EfjZUZo_SJYyhfRWDx-wz6QeH9VtSmisZwOk",
   "privateKey": "pns1Y_pTxQy0yTIINOWi-GJ6BaTaVTBEToGfWsETTTk"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cKrrdbSKLUg:APA91bGhCU65W3MMypC5sfNLG7m7EmsCi7O4uVGsLHvxLFFWd48OgWc0hthxD5Jx9ZYTHzXVNvdByS5D0qlMVQRMgTLkzHqC5_SnU8Lb7BR9z_BkuHxwCGTg-t9Cv7SGHTb_binVUAGV",
   "keys": {
       "p256dh": "BCXZL5dRgT5xCdWQaQHAfvwUojnqJIh9IikbJOzMbNl7bVrVdR3wgZBVGv51rJBX/JYTkX2eeEt5uz+Uj+/W+sY=",
       "auth": "HlHjd2J45pqqmdfqCADeGQ=="
   }
};
var payload = 'Pesan notifikasi berhasil masuk3';
 
var options = {
   gcmAPIKey: '462221845040',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options,
).catch(function(err){
   console.log(err);
   });