export type TStorageService = {
  upload: (params: { bucket: string; key: string; buffer: Buffer; mimeType: string }) => Promise<void>;
  getAllBuckets: () => Promise<any>;
};
