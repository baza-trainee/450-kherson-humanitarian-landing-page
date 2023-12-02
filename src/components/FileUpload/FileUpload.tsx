import { forwardRef, useEffect, useState } from 'react';
import { type FieldValues } from 'react-hook-form';

import { Icon } from '~components/Icon/Icon';
import { InputWrapper } from '~components/inputs/InputWrapper/InputWrapper';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';

import s from './FileUpload.module.scss';

export type FileUploadElement = HTMLInputElement;

interface FileUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	deleteFile: (name: string) => void;
	label: string;
}

export const FileUpload = forwardRef<FileUploadElement, FileUploadProps>(
	({ register, watch, deleteFile, label }, ref) => {
		const file = watch ? watch(register ? register.name : null) : null;

		const [fileName, setFileName] = useState<string>('');
		const [error, setError] = useState<string>('');

		useEffect(() => {
			if (typeof file === 'string') {
				const path = file as string;
				setFileName(path.slice(path.lastIndexOf('/') + 1, path.length));
				setError('');
			} else if (file && file.length > 0) {
				if (file[0].size < 10000000) {
					setFileName(file[0].name);
					setError('');
				} else {
					setFileName('');
					setError(
						'Файл занадто великий. Скористайтесь редактором для стиснення або оберіть інший файл',
					);
				}
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
			<InputWrapper
				label={label}
				className={error || !fileName ? s.errorBorder : s.borderWrapper}
			>
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
						<Icon
							icon="icon--eye"
							className={s.icon}
							onClick={handleShowFile}
							disabled={fileName === '0'}
						/>
						<Icon
							icon="icon--trash"
							className={s.icon}
							onClick={() => deleteFile(register?.name)}
							disabled={fileName === '0'}
						/>
					</div>
				</div>
				{error && (
					<ModalPop
						type="error"
						title="Помилка!"
						isOpen={!!error}
						onClose={() => setError('')}
					>
						{error}
					</ModalPop>
				)}
			</InputWrapper>
		);
	},
);

FileUpload.displayName = 'FileUpload';
