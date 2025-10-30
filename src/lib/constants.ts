
interface HighlightsImages {
    img: string,
    text: string,
}

interface LandingPageNews {
    img: string,
    title: string,
    text: string,
    span: string
}

export const landingPageHighLights: HighlightsImages[] = [
    {
        img: '/images/interviews.png',
        text: "Interviews"
    },
    {
        img: '/images/destination.png',
        text: "Destination Highlight"
    },
    {
        img: '/images/fashion.jpg',
        text: "Fashion"
    },
    {
        img: '/images/culture.png',
        text: "Culture"
    },
]


export const landingPageNews: LandingPageNews[] = [
   { img: '/images/hannatu.jpg',
    title: 'Interview with Nigeria’s Minister of Tourism & Creative Economy - Hannatu Musa Musawa',
    text: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.",
    span: 'continue reading'
}
   ]