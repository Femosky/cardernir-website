export type LegalSection = {
    id: string;
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    subsections?: LegalSection[];
};

export type LegalDocument = {
    title: string;
    lastUpdated: string;
    effectiveDate: string;
    intro?: string[];
    sections: LegalSection[];
    contact: {
        developer: string;
        email: string;
        website: string;
    };
};

export const privacyPolicy: LegalDocument = {
    title: 'Privacy Policy',
    lastUpdated: 'June 6, 2026',
    effectiveDate: 'June 6, 2026',
    intro: [
        'This Privacy Policy explains how Cardernir collects, uses, and protects information when you use the Cardernir mobile app and website.',
        'Cardernir is operated by Olufemi Ojeyemi, a sole proprietor registered in Canada.',
        'Cardernir is designed to work without requiring users to create an account. In this version, learning progress is stored locally on your device, and purchases are managed through your Apple ID using Apple’s in-app purchase system.',
    ],
    sections: [
        {
            id: 'information-we-collect',
            title: '1. Information We Collect',
            paragraphs: [
                'Cardernir does not require you to create an account, and we do not collect account registration information such as usernames or passwords.',
                'The app may process or store the following types of information depending on how you use it:',
            ],
            bullets: [
                'Local learning progress, such as studied cards, review history, spaced repetition scheduling, downloaded decks, and app preferences. This information is stored on your device.',
                'Purchase and subscription status provided by Apple through StoreKit, such as whether you have purchased a pack or have an active subscription.',
                'App content requests, such as requests to download available packs, decks, images, or other learning content from Cardernir’s backend.',
                'Advertising-related information processed by Google AdMob, which may include device identifiers, approximate location, ad interactions, diagnostics, and other information used to provide, limit, measure, and improve ads.',
                'Support information you choose to send us, such as your email address and the contents of your message if you contact support.',
            ],
        },
        {
            id: 'local-progress',
            title: '2. Local Progress and Device Storage',
            paragraphs: [
                'Cardernir stores learning progress locally on your device. This may include your downloaded decks, review status, study history, spaced repetition data, and app settings.',
                'Because progress is stored locally in this version, uninstalling the app, deleting app data, changing devices, or resetting your device may permanently remove your progress unless your device or Apple account provides a separate backup or restore mechanism.',
                'Cardernir does not currently provide a Cardernir account system for syncing progress across devices.',
            ],
        },
        {
            id: 'purchases',
            title: '3. Purchases and Subscriptions',
            paragraphs: [
                'Cardernir offers in-app purchases, including non-consumable purchases for individual content packs and auto-renewable subscriptions such as monthly or yearly plans. Some subscriptions may include promotional trials or introductory offers where available.',
                'Purchases are processed by Apple through the App Store. Cardernir does not receive or store your full payment card details.',
                'Your purchase and subscription status is tied to your Apple ID and is managed through Apple’s in-app purchase system. You can manage or cancel subscriptions through your Apple ID or App Store account settings.',
            ],
        },
        {
            id: 'how-we-use-information',
            title: '4. How We Use Information',
            paragraphs: ['We use information only as needed to operate, maintain, and improve Cardernir.'],
            bullets: [
                'To provide flashcard learning features and spaced repetition functionality.',
                'To download and display packs, decks, images, and learning content.',
                'To confirm access to purchased packs or subscription features.',
                'To show ads to users who do not have ad-free or premium access.',
                'To respond to support requests.',
                'To diagnose bugs, improve performance, prevent abuse, and maintain the reliability of the app.',
            ],
        },
        {
            id: 'third-party-services',
            title: '5. Third-Party Services',
            paragraphs: [
                'Cardernir uses third-party services to provide core app functionality. These services may process information according to their own privacy policies and technical requirements.',
            ],
            bullets: [
                'Apple: used for App Store distribution, in-app purchases, subscriptions, promotional offers, purchase restoration, and related purchase management.',
                'Google AdMob: used to display and measure ads. Google may process advertising-related data, including identifiers and ad interaction data, depending on your device settings, region, consent choices, and applicable law.',
                'Supabase: used to host and deliver Cardernir content such as packs, decks, card data, and related app content.',
                'Kingfisher: used in the app to load and cache images efficiently.',
                'FSRS: used to support spaced repetition scheduling.',
            ],
        },
        {
            id: 'advertising',
            title: '6. Advertising',
            paragraphs: [
                'Cardernir may show ads through Google AdMob. Ads may be personalized or non-personalized depending on your location, consent choices, Apple privacy settings, and Google’s advertising systems.',
                'Where required by law, you may be asked to provide consent before certain advertising technologies or personalized advertising features are used.',
                'Users with an active premium subscription or other ad-free access may not be shown ads in parts of the app covered by that access.',
            ],
        },
        {
            id: 'analytics-and-diagnostics',
            title: '7. Analytics and Diagnostics',
            paragraphs: [
                'Cardernir does not currently operate a separate user account analytics system. However, Apple, Google AdMob, Supabase, or other integrated services may process diagnostic, performance, crash, usage, or technical information as part of providing their services.',
                'If Cardernir adds additional analytics or crash reporting tools in the future, this Privacy Policy may be updated to describe those tools and how they are used.',
            ],
        },
        {
            id: 'audio-and-images',
            title: '8. Images, Audio, and Future Content Features',
            paragraphs: [
                'Cardernir may display images or other media associated with cards when available. These assets may be loaded from Cardernir’s backend or cached on your device.',
                'Cardernir may add audio support in a future update, including text-to-speech or audio files loaded from a storage service. If this changes how information is collected or processed, this Privacy Policy may be updated.',
            ],
        },
        {
            id: 'data-sharing',
            title: '9. How Information Is Shared',
            paragraphs: [
                'We do not sell your personal information.',
                'We may share or make information available only in the following limited situations:',
            ],
            bullets: [
                'With service providers that help operate Cardernir, such as Apple, Google AdMob, and Supabase.',
                'When required to comply with applicable law, legal process, or enforceable government request.',
                'To protect the rights, safety, security, or integrity of Cardernir, users, the public, or our services.',
                'In connection with a business transfer, such as a merger, acquisition, reorganization, or sale of assets, if Cardernir is ever transferred to another operator.',
            ],
        },
        {
            id: 'data-retention',
            title: '10. Data Retention',
            paragraphs: [
                'Local progress remains on your device until you delete it, uninstall the app, reset your device, or otherwise remove the data.',
                'Support emails may be retained for as long as needed to respond to your request, maintain records, resolve disputes, or comply with legal obligations.',
                'Third-party services may retain information according to their own privacy policies and retention practices.',
            ],
        },
        {
            id: 'your-choices',
            title: '11. Your Choices',
            bullets: [
                'You can delete local Cardernir data by deleting the app or using any in-app reset or delete options that may be available.',
                'You can manage subscriptions through your Apple ID or App Store account settings.',
                'You can restore eligible purchases in the app where purchase restoration is available.',
                'You can manage Apple advertising and tracking permissions through your device settings.',
                'You can contact us to ask privacy-related questions or request assistance.',
            ],
        },
        {
            id: 'children',
            title: '12. Children’s Privacy',
            paragraphs: [
                'Cardernir is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, please contact us so we can take appropriate action.',
            ],
        },
        {
            id: 'international-users',
            title: '13. International Users',
            paragraphs: [
                'Cardernir is operated from Canada and may be available in multiple countries and regions. By using Cardernir, you understand that information may be processed in Canada or in other countries where our service providers operate.',
                'Privacy laws may vary by location. Where required, we will handle information according to applicable privacy requirements.',
            ],
        },
        {
            id: 'security',
            title: '14. Security',
            paragraphs: [
                'We use reasonable technical and organizational measures to protect information associated with Cardernir. However, no app, website, network, or storage system can be guaranteed to be completely secure.',
            ],
        },
        {
            id: 'changes',
            title: '15. Changes to This Privacy Policy',
            paragraphs: [
                'We may update this Privacy Policy from time to time. When we make changes, we will update the “Last Updated” date above.',
                'Changes are effective when posted on this page unless a different effective date is stated. Your continued use of Cardernir after changes are posted means you accept the updated Privacy Policy.',
            ],
        },
        {
            id: 'contact',
            title: '16. Contact Us',
            paragraphs: [
                'If you have questions about this Privacy Policy or Cardernir’s privacy practices, contact us at support@cardernir.app.',
            ],
        },
    ],
    contact: {
        developer: 'Olufemi Ojeyemi',
        email: 'support@cardernir.app',
        website: 'https://www.cardernir.app',
    },
};

export const termsOfService: LegalDocument = {
    title: 'Terms of Service',
    lastUpdated: 'June 6, 2026',
    effectiveDate: 'June 6, 2026',
    intro: [
        'These Terms of Service govern your access to and use of Cardernir, including the Cardernir mobile app, website, content, packs, subscriptions, and related services.',
        'Cardernir is operated by Olufemi Ojeyemi, a sole proprietor registered in Canada.',
        'By using Cardernir, you agree to these Terms. If you do not agree, do not use the app or website.',
    ],
    sections: [
        {
            id: 'service',
            title: '1. The Cardernir Service',
            paragraphs: [
                'Cardernir is a language learning app that provides flashcards, decks, packs, spaced repetition features, images where available, and other study tools.',
                'Cardernir is provided for personal, non-commercial educational use.',
            ],
        },
        {
            id: 'no-account',
            title: '2. No Cardernir Account Required',
            paragraphs: [
                'Cardernir does not currently require users to create a Cardernir account.',
                'Purchases and subscriptions are managed through your Apple ID using Apple’s in-app purchase system. Learning progress is stored locally on your device in this version.',
                'Because progress is stored locally, Cardernir may not be able to recover your progress if you delete the app, delete app data, change devices, or lose access to your device.',
            ],
        },
        {
            id: 'license',
            title: '3. Limited License',
            paragraphs: [
                'Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to use Cardernir for your own personal educational purposes.',
                'You may not copy, sell, rent, sublicense, distribute, modify, reverse engineer, scrape, or misuse Cardernir or its content except where permitted by law.',
            ],
        },
        {
            id: 'purchases',
            title: '4. Purchases, Packs, and Subscriptions',
            paragraphs: [
                'Cardernir may offer free content, paid content packs, auto-renewable subscriptions, promotional trials, introductory offers, or other paid features.',
                'Individual pack purchases are non-consumable purchases that unlock access to the relevant pack, subject to availability and these Terms.',
                'Subscriptions may provide access to premium features, ad-free access, multiple packs, or other benefits described in the app at the time of purchase.',
                'Subscriptions automatically renew unless cancelled through your Apple ID or App Store account settings before the renewal date.',
                'All purchases are processed by Apple. We do not control Apple’s payment processing, billing, refund decisions, taxes, or payment methods.',
                'Prices may vary by country or region and may be adjusted from time to time, including to reflect local pricing, exchange rates, taxes, promotions, or platform pricing rules.',
            ],
        },
        {
            id: 'trials-and-promotions',
            title: '5. Trials and Promotional Offers',
            paragraphs: [
                'Cardernir may offer free trials, discounted subscriptions, promotional pricing, or other offers where available.',
                'Offer availability, duration, eligibility, and pricing may vary by country, region, user, platform rules, or promotional period.',
                'Unless cancelled before the end of a trial or promotional period, a subscription may renew at the regular price shown at the time of purchase.',
            ],
        },
        {
            id: 'restore-and-access',
            title: '6. Purchase Restoration and Access',
            paragraphs: [
                'If you reinstall Cardernir or change devices, you may need to use the app’s restore purchase feature or Apple’s purchase systems to regain access to eligible purchases.',
                'Access to purchases may depend on your Apple ID, App Store availability, subscription status, device compatibility, and Apple’s systems.',
            ],
        },
        {
            id: 'ads',
            title: '7. Ads and Ad-Free Access',
            paragraphs: [
                'Cardernir may show ads to users who do not have ad-free or premium access.',
                'Ads are provided through third-party advertising services such as Google AdMob. We do not control every ad shown by third-party ad networks.',
                'Premium subscriptions or other paid access may remove ads from parts of the app covered by that access, as described in the app.',
            ],
        },
        {
            id: 'content',
            title: '8. Learning Content',
            paragraphs: [
                'Cardernir’s content may include words, translations, example sentences, images, spaced repetition data, and other learning materials.',
                'We work to provide useful and accurate learning content, but we do not guarantee that all translations, examples, images, pronunciations, or explanations will be complete, current, or error-free.',
                'Cardernir is an educational tool and does not guarantee fluency, exam results, employment outcomes, immigration outcomes, or any specific learning result.',
            ],
        },
        {
            id: 'future-features',
            title: '9. Future Features',
            paragraphs: [
                'Cardernir may add, remove, or change features over time, including audio, text-to-speech, additional languages, additional packs, account features, syncing, or other functionality.',
                'We may update these Terms or the Privacy Policy when features change.',
            ],
        },
        {
            id: 'acceptable-use',
            title: '10. Acceptable Use',
            paragraphs: ['You agree not to misuse Cardernir or interfere with its normal operation.'],
            bullets: [
                'Do not attempt to access systems, data, or content without authorization.',
                'Do not copy, scrape, resell, redistribute, or publicly share paid packs or app content without permission.',
                'Do not use Cardernir to violate any law or third-party rights.',
                'Do not interfere with ads, purchases, subscriptions, security, or access-control systems.',
                'Do not reverse engineer or attempt to extract source code except where allowed by law.',
            ],
        },
        {
            id: 'intellectual-property',
            title: '11. Intellectual Property',
            paragraphs: [
                'Cardernir, including its app design, branding, software, decks, packs, text, images, structure, and other content, is owned by us or our licensors and is protected by intellectual property laws.',
                'Using Cardernir does not give you ownership of the app, brand, code, content, or paid materials.',
            ],
        },
        {
            id: 'availability',
            title: '12. Availability and Changes',
            paragraphs: [
                'We may modify, suspend, discontinue, replace, limit, or remove parts of Cardernir at any time, with or without notice, where permitted by law.',
                'We may update packs, change available content, adjust features, fix bugs, remove unavailable assets, or change how the app operates.',
                'We do not guarantee that Cardernir will always be available, uninterrupted, secure, or error-free.',
            ],
        },
        {
            id: 'third-party-services',
            title: '13. Third-Party Services',
            paragraphs: [
                'Cardernir relies on third-party services such as Apple, Google AdMob, and Supabase. These services may be subject to their own terms, policies, limitations, and availability.',
                'We are not responsible for third-party services, payment systems, ads, outages, policy decisions, or content outside our reasonable control.',
            ],
        },
        {
            id: 'apple-terms',
            title: '14. Apple App Store Terms',
            paragraphs: [
                'If you download or use Cardernir through Apple’s App Store, your use of the app is also subject to Apple’s applicable terms, including Apple’s App Store rules and the standard licensed application end user license agreement unless a separate agreement applies.',
                'Apple is not responsible for providing maintenance or support for Cardernir.',
            ],
        },
        {
            id: 'termination',
            title: '15. Termination',
            paragraphs: [
                'We may suspend or terminate access to Cardernir if we believe you have violated these Terms, misused the app, created risk for other users or the service, or if required by law.',
                'You may stop using Cardernir at any time. Deleting the app may remove locally stored progress from your device.',
            ],
        },
        {
            id: 'disclaimers',
            title: '16. Disclaimers',
            paragraphs: [
                'Cardernir is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, accuracy, availability, and non-infringement.',
                'Some jurisdictions do not allow certain disclaimers, so some of the above may not apply to you.',
            ],
        },
        {
            id: 'limitation-of-liability',
            title: '17. Limitation of Liability',
            paragraphs: [
                'To the fullest extent permitted by law, Cardernir and its developer will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data, profits, revenue, goodwill, learning progress, or other intangible losses.',
                'To the fullest extent permitted by law, our total liability for any claim related to Cardernir will not exceed the amount you paid for Cardernir in the twelve months before the claim, or CAD $50 if you paid nothing.',
            ],
        },
        {
            id: 'indemnity',
            title: '18. Indemnity',
            paragraphs: [
                'You agree to defend, indemnify, and hold harmless Cardernir and its developer from claims, damages, liabilities, losses, and expenses arising from your misuse of Cardernir, violation of these Terms, or violation of any law or third-party rights.',
            ],
        },
        {
            id: 'governing-law',
            title: '19. Governing Law',
            paragraphs: [
                'These Terms are governed by the laws of the Province of Ontario and the applicable laws of Canada, without regard to conflict of law rules.',
                'Where required by consumer protection law, you may also have rights under the laws of your country or region of residence.',
            ],
        },
        {
            id: 'changes',
            title: '20. Changes to These Terms',
            paragraphs: [
                'We may update these Terms from time to time. When we make changes, we will update the “Last Updated” date above.',
                'Changes are effective when posted on this page unless a different effective date is stated. Your continued use of Cardernir after changes are posted means you accept the updated Terms.',
            ],
        },
        {
            id: 'contact',
            title: '21. Contact Us',
            paragraphs: ['If you have questions about these Terms, contact us at support@cardernir.app.'],
        },
    ],
    contact: {
        developer: 'Olufemi Ojeyemi',
        email: 'support@cardernir.app',
        website: 'https://www.cardernir.app',
    },
};
