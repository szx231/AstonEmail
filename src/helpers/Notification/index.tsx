import { notification as notificationAntd } from 'antd';

type NotificationType = 'success' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, text: string) => {
  notificationAntd[type]({
    message: text,
  });
};

notificationAntd.config({
  duration: 3,
  maxCount: 3,
});

export const notification = (typeNote: NotificationType, text: string) => openNotificationWithIcon(typeNote, text);
