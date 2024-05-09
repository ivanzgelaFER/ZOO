import { ReactNode } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import "./ZooContainer.css";

interface ZooContainerProps {
    children: ReactNode;
    backAction?: () => void;
    headerItems?: ReactNode;
    title?: string;
    loading?: boolean;
    noPadding?: boolean;
    centered?: boolean;
    fullscreen?: boolean;
    className?: string;
}

export const ZooContainer = ({
    children,
    backAction,
    headerItems,
    title,
    loading = false,
    noPadding = false,
    centered = false,
    fullscreen = false,
    className = "",
    ...props
}: ZooContainerProps) => {
    return (
        <div
            className="zoo-container"
            {...props}
        >
            {(title || backAction || headerItems) && (
                <div className="zoo-container-header">
                    <Tooltip target=".zoo-container-back-icon"></Tooltip>
                    <i
                        data-pr-tooltip="Back"
                        className={`pi pi-angle-left ${backAction ? "zoo-container-back-icon" : ""}`}
                        onClick={backAction}
                    />
                    {title && <h2 className="zoo-container-title">{title}</h2>}
                    {headerItems && <div className="zoo-container-header-items">{headerItems}</div>}
                </div>
            )}
            <div
                className={classNames({
                    "zoo-container-content": true,
                    "no-padding": noPadding,
                    "centered-content": centered,
                    fullscreen: fullscreen,
                    [className]: className,
                })}
            >
                <div className="content">
                    {loading ? (
                        <ProgressSpinner
                            className="fluid"
                            strokeWidth="3"
                        />
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
};
