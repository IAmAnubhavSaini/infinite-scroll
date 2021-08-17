type LoadingProps = {
    message: string;
}

function Loading(props: LoadingProps) {
    return <div>{props.message}</div>;
}

export default Loading;
export type {LoadingProps};
