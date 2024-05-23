import {cn} from "@/lib/utils";
import LoaderOne from './loader-1'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

export const Loader = ({
                           size = 24,
                           className,
                           ...props
                       }: ISVGProps) => {
    return (
        <>
            <section className="h-full w-full flex items-center justify-center">
                <LoaderOne size={size} className={className}/>
            </section>

        </>
    );
};