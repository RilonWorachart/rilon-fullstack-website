import React from 'react'
import { FaInstagram, FaLine, FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next';



function Footer() {
    const { t } = useTranslation();

    return (
        <>
            <div class="px-2 py-8 bg-[#E2B22C] text-white text-center">
                <div className="flex justify-center py-[22px]">
                    <img src='/images/page_images/logo-w.png' alt="logo" className="w-[75px]"></img>
                </div>
                <div className="pb-2">
                    <p className="text-[20px] font-bold">{t('footer.p1')}</p>
                    <p>{t('footer.p2')}</p>
                    <p>{t('footer.p3')}</p>
                </div>
                <div className="flex justify-center text-[26px] py-3">
                    <a href="https://media.yellowpages.co.th/yellowpages/line/th/52336657/672d8afba717d.png?itok=6785dd8b">
                        <FaLine className="mr-0.5 hover:text-[#02B92E] " />
                    </a>
                    <a href="https://www.facebook.com/rilonriland/posts/1013050012170754/">
                        <FaFacebookSquare className="mr-0.5 hover:text-[#1773EA]" />
                    </a>
                    <a href="https://www.instagram.com/rilonthailand/">
                        <FaInstagram className="mr-0.5 hover:text-[#BB5287] " />
                    </a>
                    <a href="https://www.youtube.com/@rilon_thailand">
                        <FaYoutubeSquare className="mr-0.5 hover:text-[#F60000] " />
                    </a>
                </div>
                <div className="py-2">
                    <p>{t('footer.p5')}
                        <a href="mailto:janenyrilon_jingwei@hotmail.com" className="hover:text-[#00007E]"> janenyrilon_jingwei@hotmail.com</a>,
                        <a href="mailto:worachart_soi@hotmail.com" className="hover:text-[#00007E]"> worachart_soi@hotmail.com</a>,
                        <a href="mailto:worachartgroup@gmail.com" className="hover:text-[#00007E]"> worachartgroup@gmail.com</a>
                    </p>
                    <p>{t('footer.p6')}
                        <span className="hover:text-[#00007E]">
                            08-1694-5000
                        </span>,
                        <span className="hover:text-[#00007E]">
                            08-1697-7000
                        </span>,
                        <span className="hover:text-[#00007E]">
                            09-5961-9901
                        </span>
                    </p>
                </div>
            </div>
            <div class="bg-white text-center py-2 text-[12px]">
                <p>© 2568 <span className="text-[#E2B22C] hover:text-[#00007E]">{t('footer.p4')}</span></p>
                <p>All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer