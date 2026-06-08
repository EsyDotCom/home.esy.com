"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  publishedInfographics,
  getUniqueClusters,
  CLUSTER_LABELS,
  INFOGRAPHIC_CATEGORY_COLORS,
  type Infographic,
} from "@/data/infographics";
import LibraryHero from "@/components/LibraryHero/LibraryHero";
import HeroCarousel, {
  type HeroCarouselItem,
} from "@/components/LibraryHero/HeroCarousel";
import "./infographics.css";

const ALL_FILTER = "__all__";

function InfographicCard({ infographic }: { infographic: Infographic }) {
  const [imageError, setImageError] = useState(false);
  const color =
    INFOGRAPHIC_CATEGORY_COLORS[
      infographic.category as keyof typeof INFOGRAPHIC_CATEGORY_COLORS
    ] || "#6B7280";

  return (
    <Link
      href={`/infographics/${infographic.id}`}
      className="infographic-card"
    >
      <div className="infographic-card__image-wrap">
        {!imageError ? (
          <Image
            src={infographic.thumbnailSrc || infographic.imageSrc}
            alt={infographic.imageAlt}
            width={infographic.width}
            height={infographic.height}
            className="infographic-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: `${infographic.width} / ${infographic.height}`,
              background: "linear-gradient(135deg, #0A2540 0%, #1a3a5c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.75rem",
            }}
          >
            Infographic
          </div>
        )}
      </div>

      <div className="infographic-card__meta">
        <div className="infographic-card__meta-row">
          <span
            className="infographic-card__cluster"
            style={{ color, backgroundColor: `${color}15` }}
          >
            {CLUSTER_LABELS[infographic.cluster] || infographic.cluster}
          </span>
          <span className="infographic-card__badge">Infographic</span>
        </div>
        <h3 className="infographic-card__title">{infographic.title}</h3>
      </div>
    </Link>
  );
}

export default function InfographicsIndexClient() {
  const [activeCluster, setActiveCluster] = useState(ALL_FILTER);
  const clusters = useMemo(() => getUniqueClusters(), []);

  // Spotlight the first handful of infographics in the shared hero carousel.
  const featured = useMemo<HeroCarouselItem[]>(
    () =>
      publishedInfographics.slice(0, 6).map((item) => ({
        id: item.id,
        href: `/infographics/${item.id}`,
        imageSrc: item.thumbnailSrc || item.imageSrc,
        label: CLUSTER_LABELS[item.cluster] || "Infographic",
        title: item.title,
      })),
    []
  );

  // The grid shows the full (cluster-filtered) set — the carousel is a featured
  // rotation, not a removed-from-grid slice.
  const filtered = useMemo(
    () =>
      activeCluster === ALL_FILTER
        ? publishedInfographics
        : publishedInfographics.filter((i) => i.cluster === activeCluster),
    [activeCluster]
  );

  return (
    <div className="infographics-index">
      {/* Hero — shared immersive library "stage" with a rotating infographic spotlight. */}
      <LibraryHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Artifacts", href: "/artifacts" },
          { label: "Infographics" },
        ]}
        title={<>Research <span>Infographics</span></>}
        subhead="Citation-verified visual knowledge. Every data point traces to a source."
        meta={
          <>
            <span>
              <strong>{publishedInfographics.length}</strong> infographics
            </span>
            <span className="esy-stage__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>all citation-verified</span>
          </>
        }
        feature={<HeroCarousel items={featured} ariaLabel="Featured infographics" />}
      />

      {/* Cluster Filters + Grid */}
      {(filtered.length > 0 || clusters.length > 1) && (
        <>
          {clusters.length > 1 && (
            <nav className="infographics-filters">
              <button
                className={`infographics-filter-btn ${activeCluster === ALL_FILTER ? "infographics-filter-btn--active" : ""}`}
                onClick={() => setActiveCluster(ALL_FILTER)}
              >
                All
              </button>
              {clusters.map((cluster) => (
                <button
                  key={cluster}
                  className={`infographics-filter-btn ${activeCluster === cluster ? "infographics-filter-btn--active" : ""}`}
                  onClick={() => setActiveCluster(cluster)}
                >
                  {CLUSTER_LABELS[cluster] || cluster}
                </button>
              ))}
            </nav>
          )}

          {filtered.length > 0 && (
            <div className="infographics-masonry">
              {filtered.map((infographic) => (
                <InfographicCard
                  key={infographic.id}
                  infographic={infographic}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Coming Soon */}
      <section className="ig-coming-soon">
        <p className="ig-coming-soon__text">
          More research infographics in development. Each piece is
          citation-verified and designed to make complex knowledge accessible.
        </p>
      </section>
    </div>
  );
}
