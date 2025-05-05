interface ErrorComponentProps {
    error: string[]
    e1: string
    e2: string
    e3: string
};

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
    error, e1, e2, e3,
}) => {
    
    return (
        <div>
            {error?.some((err: string) => err.includes(e1))
                ? error?.map((err: string, index: number) => {
                    if (err.includes(e1)) {
                        return (
                            <div key={index} className="text-left">
                                <span className="text-red-500 text-xs montserrat-bold">
                                    {err}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })
                : error?.map((err: string, index: number) => {
                    if (err.includes(e1) || err.includes(e2) || err.includes(e3)) {
                        return (
                            <div key={index} className="text-left">
                                <span className="text-red-500 text-xs montserrat-bold">
                                    {err}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })}
        </div>
    );
};
