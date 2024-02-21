import type { FieldErrors, FieldValues } from 'react-hook-form';

import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { InputWrapper } from '~components/inputs/InputWrapper/InputWrapper';

interface ImgUploadWithLabelProps {
	label: string;
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	errors?: FieldErrors<FieldValues>;
	required?: boolean;
}

export const ImgUploadWithLabel = ({
	label,
	register,
	watch,
	errors,
	required,
}: ImgUploadWithLabelProps) => {
	return (
		<InputWrapper label={label} required={required}>
			<ImgUpload register={register} watch={watch} errors={errors} />
		</InputWrapper>
	);
};
