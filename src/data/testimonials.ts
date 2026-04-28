export interface Testimonial {
  name: string;
  treatment: string;
  rating: number; // 1–5
  text: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  // ── Featured reviews (shown larger at top) ──
  {
    name: "Leonie",
    treatment: "Deep Tissue Massage & Cupping",
    rating: 5,
    text: "How do I even begin to describe what Boo does for me! The first time I went for a massage she was so considerate of my migraine condition and illnesses, making sure to pace the treatment so I wouldn't flare. As soon as we knew my body was ok, we upped our treatment sessions and I instantly felt amazing. What I love about Boo is that she knows the body so well, she can feel everything and knows where the pain's root is and where it's connected to.\n\nIt's not just going for a massage, it's a holistic whole body approach because Boo knows where you need the most help and supports your body gently and properly.\n\nI've also had the cupping therapy done as well which a lot of people said they didn't like but I loved it. The day I had it I had really bad pain in my shoulders but when the cups were on, that pain lifted because I felt the pressure from the cups. Boo continued to massage in the places the cups weren't, no minutes were wasted.\n\nShe really does go above and beyond to work with you and make sure the problems you have are focused on, treated and looked after. She listens to your needs, respects your choices and is the kindest and friendliest person, you'll instantly feel at ease with her. I've had a lot of massages and treatments but I'll never go to anyone else I'm so thankful I found her, I truly feel she's made the biggest difference in my body. I honestly can't recommend her enough!",
    featured: true,
  },
  {
    name: "Hannah",
    treatment: "Shamanic Healing",
    rating: 5,
    text: "I have been having healing sessions with Leah for a few months now. I was very sceptical at first, and closed to the process. But I trust her and felt comfortable to let go and be more open minded. The changes I've seen in myself, my personal growth, my surroundings and how I deal with life are all very positive. It's like green lights all the way, no hurdles, no drama. Just growth, I feel much more able to go about my life and trust the process. I have a lot of wounds and past trauma and Boo is helping me work through them, I guess it's me that's doing 'the work' the rest of the time, but Boo has released stuff with me that I can let go and move on from. If you are ready to heal and grow, then you should definitely book in.",
    featured: true,
  },
  {
    name: "Paulina",
    treatment: "Massage & Healing",
    rating: 5,
    text: "I just wanted to say thank you again for yesterday. I'm still thinking about how amazing that session was.\n\nDuring it I felt such a deep sense of calm and relaxation. At one point I remember feeling a bit of tension in my body and then suddenly it was like my whole body just melted into the bed. When I got home I felt like an oasis of calm. It was honestly hard for anything to throw me off balance. I felt a bit tired but in a really nice way, and I even noticed I was speaking more slowly and quietly because everything in me felt so peaceful.\n\nBut the most incredible thing is that you did something I thought was impossible. For the first time in so many years I fell asleep like a child with complete silence in my head. The state I came home in yesterday was just amazing I wish I could wake up feeling like that every morning.\n\nThank you so much, truly. What you do is something really special. You're honestly amazing.",
    featured: true,
  },

  // ── Regular reviews ──
  {
    name: "Michelle",
    treatment: "Massage & Healing",
    rating: 5,
    text: "Didn't realise just how much I needed Boo in my life!! The massage and healing were incredible I feel so realigned and balanced it's unreal. Will definitely be booking again!",
  },
  {
    name: "Eva",
    treatment: "Massage",
    rating: 5,
    text: "Leah's healing hands are medicine. I always leave feeling lighter, clearer, and renewed. The actual room is tranquil and relaxing. Leah herself has an amazing energy that will make you feel instantly at ease and ready for a massage. Wholeheartedly recommend for anyone to go.",
  },
  {
    name: "Isabel",
    treatment: "Massage & Spiritual Healing",
    rating: 5,
    text: "Boo is absolutely amazing! I used to struggle with excruciating shoulder pain that ran all the way down my arm, and now it's completely gone thanks to her healing hands. Because of her, I'm able to train most days, which is something I thought I may have to stop at one point.\n\nBut it's not just the physical! Her spiritual healing sessions have been life changing. I've found such a deep sense of alignment and clarity, and every week I leave the massages feeling renewed, lighter, and more connected. I literally count down the days until my next massage and look forward to my monthly healings!\n\nBoo, you're truly the best and most beautiful person. Beyond grateful for you and what you do!",
  },
  {
    name: "Ivan",
    treatment: "Massage & Healing",
    rating: 5,
    text: "The best massage and healing I've ever had. Very effective and knowledgeable.",
  },
  {
    name: "Mark",
    treatment: "Deep Tissue Massage",
    rating: 5,
    text: "Searched high and low for someone that knows what they are doing. Spent hundreds with other people who claim to be good at what they do only to find out they were not. Boo was recommended to me and from my very first session I knew I was in the right place and that this person knew what they were doing. I would highly recommend Boo and her deep tissue session. I guarantee that you won't be disappointed.",
  },
  {
    name: "Danica",
    treatment: "Kids Healing",
    rating: 5,
    text: "Booked my son in to have a child's healing session, to try and help with his anxieties and stress with school. He absolutely loved it and can't wait until his next sessions, keeps asking when they are! Feels more chilled out and not overthinking his worries! Wish I had done it sooner! Thank you so much.",
  },
  {
    name: "Andreea",
    treatment: "Energy Rebalance",
    rating: 5,
    text: "Are you feeling depressed, anxious, or carrying a lot of trauma? Boo is the person you want to see! I've had a few of her healing sessions, and they've really made a difference for me.\n\nOne time, I was feeling very down, and I decided to try her energy rebalance. From the moment I first contacted her, I could feel her amazing, blessed energy. If you're sceptical, I get it but I noticed a change just a few days later. I went from feeling drained to feeling more energetic and active in my daily life. I definitely recommend giving her a try if you're looking for some healing and good vibes. It's worth it!",
  },
  {
    name: "Abbie",
    treatment: "Rebalance & Womb Healing",
    rating: 5,
    text: "I have visited Boo for years for massages. I also have been having healing with Boo for the last 12 months and really see the difference. I wasn't much of a believer and it took a little convincing to go ahead when I first started, but since having rebalance healing and womb healing I can't believe how much it truly does work and give positive outcomes! Highly recommend!",
  },
  {
    name: "Lisa",
    treatment: "Massage",
    rating: 5,
    text: "Boo is an exceptionally gifted massage therapist and spiritual healer offering a range of treatments covering numerous ailments as well as relaxation. I'm a journalist and write about spas and hotels internationally and I can say that some of the top spas and their massage therapists don't come close to the massage treatment and care that I've received from Boo. Her massage is outstanding and I highly recommend her professional service. Thank you Boo.",
  },
  {
    name: "Helen",
    treatment: "Massage",
    rating: 5,
    text: "Love Boo. She has amazing magic hands and the only person who I would have work on my back. She also is very special spiritually. You won't regret it if you book with her!!!",
  },
  {
    name: "Donna",
    treatment: "Massage & Healing",
    rating: 5,
    text: "I was recommended Boo by a good friend and initially booked in for a massage. The treatment was fantastic and Boo definitely got all the spots that were troubling me along with several areas that I didn't realise were even a problem. During that session Boo sensed that I had suffered a loss and offered to do healing on my next booking. I have never done anything like that before but I felt strangely drawn to Boo so agreed and she has blown my mind! I was quite sceptical about this kind of thing but I have been converted! I have felt so much happier and lighter since the appointment and the comfort it has brought me is priceless. I just wish I'd found her years ago!",
  },
  {
    name: "Peter",
    treatment: "Healing",
    rating: 5,
    text: "I just completed my first healing session, and it was truly incredible! I approached it with an open mind, and I'm so grateful I did. Boo is exceptionally knowledgeable and passionate about her work. Her genuine warm hearted nature made the entire experience comfortable as well as educational.\n\nI came away feeling fantastic, with a renewed sense of clarity and well-being. The insights I gained were profound, and I can't recommend this experience enough.",
  },
  {
    name: "Zach",
    treatment: "Massage",
    rating: 5,
    text: "This was the best massage I've ever had! It was a relaxing and welcoming environment with the massage leaving me feeling happy and lighter afterwards.",
  },
  {
    name: "Nat",
    treatment: "Massage & Healing",
    rating: 5,
    text: "Boo is the best ever, she has an incredible gift and magic hands. So grateful for her.",
  },
  {
    name: "Lisa W.",
    treatment: "Therapeutic Massage",
    rating: 5,
    text: "I've been getting massages from Boo for years now and she is incredible! Boo always knows exactly what I need and where my knots are. I have fibromyalgia and arthritis and my conditions are kept under control with regular massages from Boo. I honestly don't know what I'd do without her.",
  },
  {
    name: "Debz",
    treatment: "Massage & Healing",
    rating: 5,
    text: "Boo is an absolute incredible massage therapist and healer. She is the BEST!!!",
  },
  {
    name: "Helen",
    treatment: "Deep Tissue Massage",
    rating: 5,
    text: "I have been seeing Boo for a couple of years now and I would not let anyone else near my back. She is amazing at what she does. She brings me so much pain for someone so small but it is exactly what I need. She is such a lovely person too inside and out. She is a caring soul. Choosing Boo will be the best thing you have done for a while I guarantee it!!!",
  },
  {
    name: "Fi",
    treatment: "Massage & Chakra Realignment",
    rating: 5,
    text: "The deepest, most amazing massage. Equal amounts brutal and relaxing and a lovely chakra realignment to finish. Good for the body and the soul.",
  },
  {
    name: "Dawn",
    treatment: "Therapeutic Massage",
    rating: 5,
    text: "Boo is the best I've had and I'm a beauty therapist. Unfortunately now I have medical conditions that I need Boo's wonderful firm touch to help me to continue life a little less pain free. Book with Boo for specialist healing needs and for that perfect treat for anyone in your life.",
  },
  {
    name: "Andre",
    treatment: "Massage",
    rating: 5,
    text: "Having travelled the world and had massages wherever I go, I can without a doubt say Boo is one of the best in the business. Every time it's a little bit of heaven. Thank you as always.",
  },
  {
    name: "Suzanne",
    treatment: "Massage",
    rating: 5,
    text: "Another exceptional session. Working at a desk and on a laptop all day means I'm a regular to Boo. She sorts out my knots and back stiffness every time.",
  },
  {
    name: "Jenny",
    treatment: "Massage",
    rating: 5,
    text: "Exceptional massage which truly sorts out my back every time!!",
  },
];

// ── Homepage preview picks ──
export const homepageTestimonials = [
  {
    name: "Eva",
    text: "Leah's healing hands are medicine. I always leave feeling lighter, clearer, and renewed. The actual room is tranquil and relaxing. Wholeheartedly recommend.",
    rating: 5,
  },
  {
    name: "Lisa",
    text: "Boo is an exceptionally gifted massage therapist and spiritual healer. Some of the top spas don't come close to the treatment and care I've received from Boo.",
    rating: 5,
  },
  {
    name: "Donna",
    text: "I was quite sceptical about this kind of thing but I have been converted! I have felt so much happier and lighter since the appointment. I just wish I'd found her years ago!",
    rating: 5,
  },
];
