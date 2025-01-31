
interface Props {
    message: string
    title?: string
}

export const Error = ({ message }: Props) => {

    return (
        <div className="mb-4">
            <div className="flex justify-center">
                <svg className="h-20 w-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </div>
            {/* <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                {title}
            </h2> */}
            <p className="mt-2 text-center text-sm text-red-400">
                {message}
            </p>
        </div>
    )

}
