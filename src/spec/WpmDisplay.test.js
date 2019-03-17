import * as React from "react";
import {cleanup, render} from "react-testing-library";
import {WpmDisplay} from "../WpmDisplay";

describe('WpmDisplay', function () {
    it('should show WPM', function () {
        const startTime = new Date();
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 1);

        const container = render(<WpmDisplay startTime={startTime} endTime={endTime} wordCount={30}/>);

        container.getByText("WPM:");
        container.getByText("30");
    });

    afterEach(cleanup);
});
