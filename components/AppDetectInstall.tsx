import styled from "styled-components";
import { pkg, getDeviceName } from "../utils";
import { isMobile } from "react-device-detect";

const AppDetectInstallContainerStyle = styled.div.attrs(({
    theme
}: any) => ({
    role: "alert",
    className: `p-2 bg-${theme.textName} items-center text-${theme.textName} leading-none rounded-full flex lg:inline-flex`,
}))``

const StatusStyle = styled.span.attrs(({
    theme
}: any) => ({
    className: `flex rounded-full bg-${theme.bgName} uppercase px-2 py-1 text-xs font-bold mr-3`
}))``

const TextStyle = styled.span.attrs(({
    theme
}) => ({
    className: `font-semibold mr-2 text-left flex-auto text-${theme.bgName}`
}))``

const NameHighlite = styled.span.attrs(({ }) => ({
    className: "text-indigo-300"
}))``

const AppOpenOrInstall = ({ status, appName, deviceName }: { status: string, appName: string, deviceName: string }) => <span>{status === "Install" ? "Please install " : "Open "}<NameHighlite>{appName}</NameHighlite> on your <NameHighlite>{deviceName}</NameHighlite> device</span>

const AppDetectInstall = ({ }) => {
    const status = "Install";
    const appName = (pkg.app.name);
    const deviceName = getDeviceName();

    return (
        <a href={isMobile ? `intent://scan/#Intent;scheme=${pkg.app.urlScheme};package=${pkg.app.pkgName};end`: 'javascript:;'}>
            <AppDetectInstallContainerStyle>
                <StatusStyle>{status}</StatusStyle>
                <TextStyle>
                    <AppOpenOrInstall status={status} appName={appName} deviceName={deviceName} />
                </TextStyle>
            </AppDetectInstallContainerStyle>
        </a>
    )
}

export default AppDetectInstall