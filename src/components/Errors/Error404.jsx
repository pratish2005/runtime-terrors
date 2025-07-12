import { Empty } from "keep-react";
import generateUrl from "../../utils/routes"

const Error404 = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Empty>
                <Empty.Image>
                    <img
                        src="https://staticmania.cdn.prismic.io/staticmania/ed90f683-c1df-4bad-afa4-65ce4c65287e_Property+1%3DSpaceship_+Property+2%3DMd.svg"
                        alt="404"
                        className="w-full"
                    />
                </Empty.Image>
                <Empty.Title>404 Not Found</Empty.Title>
                <Empty.Redirect buttonText="Go to Home" redirectUrl={generateUrl('dashboard')} />
            </Empty>
        </div>
    );
};

export default Error404;
