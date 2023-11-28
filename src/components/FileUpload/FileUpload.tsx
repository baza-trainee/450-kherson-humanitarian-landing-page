import { forwardRef, useEffect, useState } from 'react';
import { type FieldErrors, type FieldValues } from 'react-hook-form';

import { Icon } from '~components/Icon/Icon';
import { InputWrapper } from '~components/inputs/InputWrapper/InputWrapper';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';

import s from './FileUpload.module.scss';

export type FileUploadElement = HTMLInputElement;

interface FileUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	errors?: FieldErrors<FieldValues>;
	deleteFile: () => void;
	label: string;
}

export const FileUpload = forwardRef<FileUploadElement, FileUploadProps>(
	({ register, watch, errors, deleteFile, label }, ref) => {
		const file = watch ? watch(register ? register.name : null) : null;
		const [fileName, setFileName] = useState<string>('');

		useEffect(() => {
			if (typeof file === 'string') {
				const path = process.env.NODE_ENV === 'development' ? `${BASE_URL}${file}` : file;
				setFileName(path.slice(path.lastIndexOf('/') + 1, path.length));
			} else if (file && file.length > 0) {
				setFileName(file[0].name);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [file]);

		const handleShowFile = () => {
			if (typeof file === 'string') {
				window.open(`${BASE_URL}${file}`);
			} else if (file && file.length > 0) {
				window.open(URL.createObjectURL(file[0]));
			}
		};

		return (
			<InputWrapper label={label} className={s.borderWrapper}>
				<div className={s.fileUploadBlock}>
					<Text variant="footer" className={s.underline}>
						{fileName}
					</Text>
					<div className={s.iconBlock}>
						<label>
							<Icon icon="icon--upload" className={s.icon} />
							<input
								type="file"
								className={s.hidden}
								ref={ref}
								accept="application/x-7z-compressed, application/vnd.rar, application/zip, application/gzip, application/x-bzip, application/x-bzip2, application/zip, text/plain, text/markdown, application/rtf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/epub+zip, application/pdf"
								{...register}
							/>
						</label>
						<Icon icon="icon--eye" className={s.icon} onClick={handleShowFile} />
						<Icon icon="icon--trash" className={s.icon} onClick={deleteFile} />
					</div>
				</div>
			</InputWrapper>
		);
	},
);

FileUpload.displayName = 'FileUpload';
