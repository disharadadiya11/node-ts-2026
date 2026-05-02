export const uploadFile = async (file: any, baseUrl: string): Promise<string> => {
  // Placeholder implementation - you would implement actual file upload logic here
  // For now, return a mock URL
  return `${baseUrl}/uploads/${file?.name || 'default.jpg'}`;
};
