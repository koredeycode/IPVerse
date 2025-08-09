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

export const getTotalSeconds = (duration: number, unit: string): number => {
  const secondsIn = {
    Days: 24 * 60 * 60,
    Weeks: 7 * 24 * 60 * 60,
    Months: 30 * 24 * 60 * 60, // Assuming 30 days per month for simplicity
  };

  return duration * (secondsIn[unit as keyof typeof secondsIn] || 0);
};
