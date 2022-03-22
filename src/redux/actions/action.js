import * as type from "../consts";

export function testData(data) {
    return {
        type: type.test_data,
        payLoad: data,
    };
}