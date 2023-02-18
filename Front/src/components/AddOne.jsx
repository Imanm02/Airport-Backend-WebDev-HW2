import IntroSection from "./general/IntroSection";

import React from 'react';
import {images} from "../constants";

function AddOne() {

    const title = "برای سفر خود برنامه‌ریزی کنید";
    const description = "اولین قدم برای شروع یک مسافرت لذت بخش و رویایی انتخاب درست مقصد است. انتخاب مقصد نهایی مناسب به شما در تجربه یک سفر منحصر به فرد کمک خواهد کرد. شما می‌توانید با استفاده از اطلاعاتی که از مکان‌ها دیدنی مختلف در بیلینو می‌بینید بهترین انتخاب را داشته باشید."

    return (
        <div style={{background:'white'}}>
            <IntroSection
                title={title}
                description={description}
                image={images.airport}
                color={'#ff8945'}
                grid_direction={'left'}
            />
        </div>
    );
}

export default AddOne;