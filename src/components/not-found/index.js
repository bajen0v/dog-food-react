import { Button } from '../button';


const style = {    
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

function NotFound({
	title,
	children,
	buttonText = 'На главную',
	buttonAction
}) {
	return (
		<div style={style}>
			{buttonAction ? (
				<Button href='#' action={buttonAction}>
					{buttonText}
				</Button>
			) : (
				<Button href='/'>{buttonText}</Button>
			)}

			<h1>{title}!</h1>
			{children && children}
		</div>
	);
}

export default NotFound;
