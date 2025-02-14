import './Settings.css';
import { TEST_IDS } from '@common/constants.tsx';

function Settings() {
    return (
        <>
            <div data-testid={TEST_IDS.settings}>Settings</div>
        </>
    );
}
export default Settings;
