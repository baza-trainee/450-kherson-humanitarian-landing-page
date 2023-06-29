import s from './InputText.module.scss';

type Props = {
	children: string;
};

export function InputText({ children }: Props) {
	return <p className={s.inputText}>{children}</p>;
}
