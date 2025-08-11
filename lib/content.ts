// Allowed file types
export const ALLOWED_IMAGE = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const ALLOWED_TEXT = ["text/plain", "application/json", "text/markdown"];
export const ALLOWED_AUDIO = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp4",
  "audio/aac",
];
export const ALLOWED_VIDEO = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
];

export const ALLOWED_TYPES = [
  ...ALLOWED_IMAGE,
  ...ALLOWED_TEXT,
  ...ALLOWED_AUDIO,
  ...ALLOWED_VIDEO,
];

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "🖼️";
    case "txt":
    case "md":
    case "json":
      return "📄";
    case "mp3":
    case "wav":
    case "m4a":
    case "aac":
      return "🎵";
    case "mp4":
    case "mov":
    case "avi":
      return "🎬";
    default:
      return "❓";
  }
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "image";
    case "txt":
    case "md":
    case "json":
      return "text";
    case "mp3":
    case "wav":
    case "m4a":
    case "aac":
      return "audio";
    case "mp4":
    case "mov":
    case "avi":
      return "video";
    default:
      return "others";
  }
};

export const getTotalSeconds = (duration: number, unit: string): number => {
  const secondsIn = {
    Days: 24 * 60 * 60,
    Weeks: 7 * 24 * 60 * 60,
    Months: 30 * 24 * 60 * 60, // Assuming 30 days per month for simplicity
  };

  return duration * (secondsIn[unit as keyof typeof secondsIn] || 0);
};

export const fromTotalSeconds = (
  totalSeconds: number
): { duration: number; unit: string } => {
  const secondsIn = {
    Days: 24 * 60 * 60,
    Weeks: 7 * 24 * 60 * 60,
    Months: 30 * 24 * 60 * 60, // Assuming 30 days per month
  };

  // Choose the largest unit possible
  if (totalSeconds % secondsIn.Months === 0) {
    return { duration: totalSeconds / secondsIn.Months, unit: "Months" };
  }
  if (totalSeconds % secondsIn.Weeks === 0) {
    return { duration: totalSeconds / secondsIn.Weeks, unit: "Weeks" };
  }
  if (totalSeconds % secondsIn.Days === 0) {
    return { duration: totalSeconds / secondsIn.Days, unit: "Days" };
  }

  // Fallback — return in seconds
  return { duration: totalSeconds, unit: "Seconds" };
};

export function getExpiryInfo(totalSeconds: number, subscriptionDate: string) {
  const startDate = new Date(subscriptionDate);
  const expiryDate = new Date(startDate.getTime() + totalSeconds * 1000);

  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const expiresInText =
    diffDays <= 0 ? "Expired" : `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;

  // Format expiry date (e.g., Aug 20, 2025)
  const formattedExpiry = expiryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return {
    expiresIn: expiresInText,
    expiryDate: formattedExpiry,
  };
}
