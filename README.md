# StepByStep - Reduce your carbon footprint


## Inspiration
Climate change is without a doubt **the greatest challenge that humanity as a whole has ever faced**.

And we all can be better people for the planet. But we are also lazy and set in our ways. And we react very defensively when being confronted. So steps towards an eco-friendly future should be small, but numerous. Unintrusive, but hassle-free.

We truly believe that people don't change by being rectified directly, but rather by **continuous exposure to gradual adjustments**.

---

## What it does
We've built a browser extension that tracks your online behavior and advises you about eco-friendly alternatives to various sccenarios. 

* You're looking for **a flight to Amsterdam**? Did you know that there are also multiple train connections available?
* You are **using an online shop**? We've found the same item only 800 meters away from your home to avoid ordering a package.
* You are **using the website of Company X** a lot online. Did you know about their recent environmental news and their eco-friendliness score?

The suggestions made are meant to be small, pain-free and require only slight changes in ones behavior. Most of the time, a user might not even think about alternatives, so a nudge in the right direction is all that is needed to improve step by step.

How much CO2 can you save in a month by just changing a decision here and there?

---

## How we built it
The browser extension directly consumes an **API built on top of multiple small microservices** for the various advice systems. 

New targets and advices can be added easily to provide a holistic approach with suggestions in as many areas of life as possible. We've started with the three main scenarios outlined above but many more are possible and feasible.

The **browser extension is built mostly with plain javascript** to reduce performance drag on the browsing activity itself. The suggestions however are not just small notices but actively integrate into the target website to place attention right where decisions are being made. Next to the "checkout"-button, above the "result" listings, etc...

The **API is an open-source RESTful API built with .NET Core**, containerized and split into subsystems for the various areas of advice. A Kubernetes cluster had been prepared in the IBM Cloud but was not used in the first version to simplify debugging during the hackathon.

Each area of advise requires very different approaches to find alternatives. Currently we are using a mix of traditional web crawling and the APIs of **Google Maps**, **TomTom**, **flight calculators** and other travel service providers to power our suggestions. And last but not least we use the **ESG-scoring produced by Vontobel** to provide an eco-score for the websites visited.

---

## Challenges we ran into
* Originally we planned on getting most of our data via web crawling. But many of the larger companies with the right repositories employ **active anti-crawling methods** and we we're rate-limited or blocked quite often at the beginning
* It was our first time **building a browser extension** and we did not yet know their capabilities and limitations.
* We've noticed that offering information is easy, but making the **UX intuitive and truly helpful** is another thing altogether. So we spent a lot of time brainstorming the basic flow in the browser and completely reworked the interaction more than once.
* Integrating into websites requires very exact adaptions to the specific website at hand. So we can easily add more alternatives, but adding more source websites that trigger the search (such as additional flight websites) takes much longer.

---

## Accomplishments that we're proud of
* We are now able to compare Amazon products with the product catalogues of seven larger German retailers (e.g. Saturn, Bauhaus and Galeria Kaufhos) on the fly
* The whole system as demo'ed uses real-world data and no mocks and can be freely tested with other websites and/or products.

---

## What we learned
* Implementing a Google Chrome extension
* Crawling and processing retail information
* The environmental impact of various small choices

---

## What's next for StepByStep
* We mainly need to integrate more websites that trigger a search for alternatives. More flight search engines, more online stores, etc...
* We are also looking for other areas where a small choice can have a big impact
* Ensuring the scalability of various used APIs and data source is the only roadblock to actually releasing the extension for free in the Google Chrome Web Store