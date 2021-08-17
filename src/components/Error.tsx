type ErrorProps = {
    error: Error;
}

function Error(props: ErrorProps) {
    return <div className="error">{props.error.message}</div>;
}

export default Error;
export type {ErrorProps};
