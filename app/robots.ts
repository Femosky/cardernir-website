import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteMetadata';

/** Everyone may read the site, including the assistants that have started recommending the app. */
const AI_CRAWLERS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'CCBot', 'Bytespider', 'DeepSeekBot', 'Amazonbot', 'meta-externalagent', 'DuckAssistBot', 'YouBot', 'cohere-ai', 'MistralAI-User'];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/' },
            ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
        ],
        host: SITE_URL,
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
