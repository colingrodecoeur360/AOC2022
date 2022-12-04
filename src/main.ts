import { displaySolutions } from "./utils";
import { day01 } from "./day01";
import { day02 } from "./day02";


displaySolutions({
    1: day01(),
    2: day02(),
}, { latest: true });
