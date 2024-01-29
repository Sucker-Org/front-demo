/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: Eric Front-end Template demos
 */

import Footer from '@/components/footer';
import Header from '@/components/header';
import ColorButton from '@/components/colorButton';
import { useEffect, useRef } from 'react';
import RingAvatar from '@/components/ringAvatar';
const App: React.FunctionComponent = () => {
    const containerRef = useRef(null);
    const demoList = [
        { name: 'clipText', url: '/demos/clipText/index.html' },
        { name: 'grid01', url: '/demos/grid01/index.html' },
        { name: 'mouseLine', url: '/demos/mouseLine/index.html' },
        { name: 'ring-shaped', url: '/demos/ring-shaped/index.html' },
        { name: 'setPrice', url: '/demos/setPrice/index.html' },
        { name: 'dingDing', url: '/demos/dingDing/index.html' },
    ];
    useEffect(() => {
        const container = containerRef.current;
        const cards = container.querySelectorAll(".card");

        const handleMouseMove = (e) => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        const handleMouseLeave = (e) => {
            for (const card of cards) {
                card.style.setProperty("--mouse-x", '1000px');
                card.style.setProperty("--mouse-y", '1000px');
            }
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        // Clean up event listeners on component unmount
        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    return (
        <div className='app-bg'>
            <Header />
            <div className="hero-bg"></div>
            <svg className="position-absolute hero-svg" aria-hidden="true"><defs><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect></svg>

            <div className="container pt-5">
                <div className='text-center'>
                    <RingAvatar imgSrc={'/demos/ring-shaped/o.png'} />
                </div>
                <div className="position-relative pt-3">
                    <h1 className="text-center web-slogan">Sucker Front-end Demos</h1>
                    <p className="text-center">Wang Wang && Eric</p>
                </div>
                <div className="grid text-center pt-5" id="demoList" ref={containerRef}>
                    {
                        demoList.map((item, index) => {
                            return (
                                <div className="g-col-6 g-col-sm-4 g-col-lg-3 card" key={index}>
                                    <div className="card-body">
                                        <a href={item.url} target="_blank">{item.name}</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <ColorButton text="Hello Sucker" className="my-5 mx-auto d-block" />
            </div>
            <Footer />
        </div>
    );
}

export default App;