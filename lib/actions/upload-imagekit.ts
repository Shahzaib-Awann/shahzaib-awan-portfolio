import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const uploadFile = async (
  file: File,
  folder: string
): Promise<{ url: string | null; fileId: string | null }> => {
  try {
    if (!file) {
      return { url: null, fileId: null }
    }

    // 🔥 Convert file → base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // 🔥 Upload
    const uploadRes = await imagekit.files.upload({
      file: base64,
      fileName: `${Date.now()}-${file.name}`,
      folder,
    });

    return {
      url: uploadRes.url ?? null,
      fileId: uploadRes.fileId ?? null,
    };
  } catch (error) {
    console.error("[Image Upload Error]:", error);
    throw new Error("Image upload failed");
  }
};

export const deleteFile = async (fileId: string): Promise<boolean> => {
    try {
      if (!fileId) return false;
  
      await imagekit.files.delete(fileId);
  
      return true;
    } catch (error) {
      console.error("[Image Delete Error]:", error);
      throw new Error("Image deletion failed");
    }
  };