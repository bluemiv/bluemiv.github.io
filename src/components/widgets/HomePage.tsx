import { Container } from "@/components/atoms/Container";
import { FeaturedArticle } from "@/components/widgets/FeaturedArticle";
import { HomeArticlesSection } from "@/components/widgets/HomeArticlesSection";
import { HomeHero } from "@/components/widgets/HomeHero";
import { HomeNotesSection } from "@/components/widgets/HomeNotesSection";
import { PageTransition } from "@/components/widgets/PageTransition";
import { SITE_CONFIG } from "@/config/siteConfig";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import { selectHomeArticles, summarizeArticleTaxonomy } from "@/features/article/articleCollection";
import { getArticleDocument, getPublishedArticles } from "@/features/article/articleRepository";
import type { Locale } from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { calculateCareerMonthOrdinal, formatYearMonth } from "@/features/profile/careerDuration";

type PropsWithHomePage = {
  locale: Locale;
};

export function HomePage({ locale }: PropsWithHomePage) {
  const copy = HOME_COPY[locale];
  const articles = getPublishedArticles(locale);
  const notes = getPublishedNotes(locale);
  const { featuredArticle, latestArticles } = selectHomeArticles(articles);
  const taxonomy = summarizeArticleTaxonomy(articles);
  const topicCount = taxonomy.reduce((count, category) => count + category.topics.length, 0);
  const featuredDocument = featuredArticle
    ? getArticleDocument(featuredArticle.slug, locale)
    : null;
  const showHomeAd = locale === "ko" && latestArticles.length >= 4;
  const careerMonthOrdinal = calculateCareerMonthOrdinal(
    SITE_CONFIG.careerStartMonth,
    formatYearMonth(new Date(), SITE_CONFIG.timeZone),
  );

  return (
    <PageTransition>
      {showHomeAd ? <AdSenseScript /> : null}

      <HomeHero
        articleCount={articles.length}
        careerMonthOrdinal={careerMonthOrdinal}
        copy={copy.hero}
        hasArticles={articles.length > 0}
        noteCount={notes.length}
        topicCount={topicCount}
      />

      <Container className="py-16 md:py-24">
        {featuredArticle ? (
          <FeaturedArticle
            article={featuredArticle}
            copy={copy.featured}
            locale={locale}
            readingTimeMinutes={featuredDocument?.readingTimeMinutes ?? null}
          />
        ) : null}

        <HomeArticlesSection
          articles={latestArticles}
          copy={{ latest: copy.latest, topics: copy.topics }}
          hasFeaturedArticle={Boolean(featuredArticle)}
          locale={locale}
          showAd={showHomeAd}
          taxonomy={taxonomy}
          totalArticleCount={articles.length}
        />
      </Container>

      <HomeNotesSection copy={copy.notes} locale={locale} notes={notes} />
    </PageTransition>
  );
}
