import IntroSection from "./general/IntroSection";

import React from 'react';
import {images} from "../constants";

function AddTwo() {

    const title = "برای سفر خود برنامه‌ریزی کنید";
    const description = "اولین قدم برای شروع یک مسافرت لذت بخش و رویایی انتخاب درست مقصد است. انتخاب مقصد نهایی مناسب به شما در تجربه یک سفر منحصر به فرد کمک خواهد کرد. شما می‌توانید با استفاده از اطلاعاتی که از مکان‌ها دیدنی مختلف در بیلینو می‌بینید بهترین انتخاب را داشته باشید."

    return (
        <IntroSection
            title={title}
            description={description}
            image={images.travelTogether}
            color={'#0B9AA1'}
            grid_direction={'right'}
        />
    );
}

export default AddTwo;