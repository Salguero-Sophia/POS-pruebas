
interface Props {
    message: string
    title?: string;
}
export const Success = ({ message }: Props) => {
    return (
        <div className="mb-8">
            <div className="flex justify-center">
                <svg className="h-20 w-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            {/* <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
                {title}
            </h2> */}
            <p className="mt-2 text-center text-sm text-green-400">
                {message}
            </p>
        </div>
    )
}
