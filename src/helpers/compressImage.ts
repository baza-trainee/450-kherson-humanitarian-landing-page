import imageCompression from 'browser-image-compression';

export interface CompressImage {
	image: string;
	type: string;
}

const options = {
	maxSizeMB: 0.488,
	maxWidthOrHeight: 1920,
};

export async function compressImage(imageFile: File): Promise<CompressImage> {
	let image = '';
	let type = '';

	try {
		const compressedFile = await imageCompression(imageFile, options);

		await imageCompression
			.getDataUrlFromFile(compressedFile)
			.then((dataImage) => (image = dataImage.toString()));
		type = imageFile.type;
	} catch (error) {
		console.error('Error imageCompression:', error);
	}

	return { image, type };
}
