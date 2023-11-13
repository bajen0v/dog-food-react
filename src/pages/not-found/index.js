import NotFound from "../../components/not-found";



export function NotFoundPage({title = "Извините, страницы с таким адресом не существует"}) {
    return (
        <NotFound title={title}/>
        )
}