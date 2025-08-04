import { globalUser } from "../components/user/context.js";

try {
  const user = await globalUser();
  const nextPing = new Date(localStorage.getItem("next-ping") || 0);
  if (navigator.sendBeacon && user.isAuthenticated && nextPing < new Date()) {
    const params = new URLSearchParams();

    navigator.sendBeacon("/api/v1/ping", params);

    const newNextPing = new Date();
    newNextPing.setUTCDate(newNextPing.getUTCDate() + 1);
    newNextPing.setUTCHours(0);
    newNextPing.setUTCMinutes(0);
    newNextPing.setUTCSeconds(0);
    newNextPing.setUTCMilliseconds(0);
    localStorage.setItem("next-ping", newNextPing.toISOString());
  }
} catch (error) {
  console.error("Failed to send ping", error);
}
