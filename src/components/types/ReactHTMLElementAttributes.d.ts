type ReactHTMLElementAttributes<
	E,
	A extends React.HTMLAttributes<E> = React.HTMLAttributes<E>,
> = React.DetailedHTMLProps<A, E>;
