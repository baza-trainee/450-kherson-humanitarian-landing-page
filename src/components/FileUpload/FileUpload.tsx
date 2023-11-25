import { forwardRef, useEffect } from 'react';
import { type FieldErrors, type FieldValues, useForm } from 'react-hook-form';

import { Icon } from '~components/Icon/Icon';
import { TextInput } from '~components/inputs/TextInput/TextInput';

import s from './FileUpload.module.scss';

export type FileUploadElement = HTMLInputElement;

interface FileUploadProps {
	fileRegister?: FieldValues;
	label: string;
	watch?: (name: string) => FieldValues;
	errors?: FieldErrors<FieldValues>;
}
interface FormFields {
	textRegister: string;
}

export const FileUpload = forwardRef<FileUploadElement, FileUploadProps>(
	({ fileRegister, label, watch, errors }, ref) => {
		const file = watch ? watch(fileRegister ? fileRegister.name : null) : null;

		const { register, setValue } = useForm<FormFields>({
			mode: 'onChange',
		});

		const textRegister = register('textRegister');

		useEffect(() => {
			if (typeof file === 'string') {
				const path = file as string;
				setValue('textRegister', path.slice(path.lastIndexOf('/') + 1, path.length));
			} else if (file && file.length > 0) {
				setValue('textRegister', file[0].name);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [file]);

		return (
			<div className={s.fileUploadBlock}>
				<TextInput
					className={s.fileUpload}
					required
					label={label}
					maxLength={0}
					errors={errors}
					register={textRegister}
				/>
				<label>
					<Icon icon="icon--upload" className={s.icon} />
					<input
						type="file"
						className={s.hidden}
						ref={ref}
						accept="application/x-7z-compressed, application/vnd.rar, application/zip, application/gzip, application/x-bzip, application/x-bzip2, application/zip, text/plain, text/markdown, application/rtf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/epub+zip, application/pdf"
						{...fileRegister}
					/>
				</label>
			</div>
		);
	},
);

FileUpload.displayName = 'FileUpload';
