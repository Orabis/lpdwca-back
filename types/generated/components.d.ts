import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAlumniFilter extends Struct.ComponentSchema {
  collectionName: 'components_shared_alumni_filters';
  info: {
    description: 'Un bouton de filtre par parcours';
    displayName: 'Filtre alumni';
    icon: 'filter';
    name: 'Filtrealumni';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_cards';
  info: {
    description: 'Coordonn\u00E9e affich\u00E9e sur la page Contact';
    displayName: 'Carte de contact';
    icon: 'address-card';
    name: 'Cartedecontact';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.Text;
  };
}

export interface SharedCourseCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_course_cards';
  info: {
    description: 'Domaine enseign\u00E9 : titre, description, illustration et destination';
    displayName: 'Carte de cours';
    icon: 'book';
    name: 'CourseCard';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCtaBand extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_bands';
  info: {
    description: 'Bloc de relance en fin de page';
    displayName: "Bande d'appel \u00E0 l'action";
    icon: 'bullhorn';
    name: "Banded'appel\u00E0l'action";
  };
  attributes: {
    primaryHref: Schema.Attribute.String;
    primaryLabel: Schema.Attribute.String;
    secondaryHref: Schema.Attribute.String;
    secondaryLabel: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDefinition extends Struct.ComponentSchema {
  collectionName: 'components_shared_definitions';
  info: {
    description: 'Couple libell\u00E9 / valeur, pour une liste de r\u00E9f\u00E9rences (code RNCP, ECTS, volume horaire\u2026)';
    displayName: 'D\u00E9finition';
    icon: 'list';
    name: 'Definition';
  };
  attributes: {
    term: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedEligibilityPanel extends Struct.ComponentSchema {
  collectionName: 'components_shared_eligibility_panels';
  info: {
    description: 'Un cas de figure du \u00AB Suis-je concern\u00E9 \u00BB';
    displayName: "Panneau d'\u00E9ligibilit\u00E9";
    icon: 'question-circle';
    name: "Panneaud'\u00E9ligibilit\u00E9";
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    description: 'Un champ du formulaire de contact';
    displayName: 'Champ de formulaire';
    icon: 'keyboard';
    name: 'Champdeformulaire';
  };
  attributes: {
    full: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'shared.list-item', true>;
    placeholder: Schema.Attribute.String;
    textarea: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.String;
  };
}

export interface SharedFormationType extends Struct.ComponentSchema {
  collectionName: 'components_shared_formation_types';
  info: {
    description: 'Apprentissage ou formation continue';
    displayName: 'Type de formation';
    icon: 'id-card';
    name: 'Typedeformation';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    question: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFundingColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_funding_columns';
  info: {
    description: 'Un groupe de dispositifs';
    displayName: 'Colonne de financement';
    icon: 'columns';
    name: 'Colonnedefinancement';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.funding-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFundingItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_funding_items';
  info: {
    description: 'Un dispositif, avec son explication';
    displayName: 'Dispositif de financement';
    icon: 'euro-sign';
    name: 'Dispositifdefinancement';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: "Premier \u00E9cran de la page d'accueil";
    displayName: 'En-t\u00EAte immersif';
    icon: 'star';
    name: 'Hero';
  };
  attributes: {
    accentWord: Schema.Attribute.String;
    ctaPrimaryHref: Schema.Attribute.String;
    ctaPrimaryLabel: Schema.Attribute.String;
    ctaSecondaryHref: Schema.Attribute.String;
    ctaSecondaryLabel: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    logosAlt: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_info_cards';
  info: {
    description: 'Carte \u00E0 ic\u00F4ne avec une liste de points';
    displayName: "Carte d'information";
    icon: 'th-large';
    name: "Carted'information";
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    ordered: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLead extends Struct.ComponentSchema {
  collectionName: 'components_shared_leads';
  info: {
    description: 'Responsable scientifique de la formation';
    displayName: 'Responsable';
    icon: 'user';
    name: 'Responsable';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right']>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    photoAlt: Schema.Attribute.String;
    role: Schema.Attribute.Text;
  };
}

export interface SharedLegalSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_sections';
  info: {
    description: 'Une section des mentions l\u00E9gales';
    displayName: 'Section l\u00E9gale';
    icon: 'gavel';
    name: 'Sectionl\u00E9gale';
  };
  attributes: {
    definitions: Schema.Attribute.Component<'shared.definition', true>;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    links: Schema.Attribute.Component<'shared.link', true>;
    paragraphs: Schema.Attribute.Component<'shared.paragraph', true>;
    sectionId: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Lien sortant : libell\u00E9 affich\u00E9, URL, et ouverture dans un nouvel onglet';
    displayName: 'Lien';
    icon: 'link';
    name: 'Link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    href: Schema.Attribute.Text & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_groups';
  info: {
    description: 'Une colonne du pied de page : un titre et ses liens';
    displayName: 'Colonne de liens';
    icon: 'bars';
    name: 'LinkGroup';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    description: "Une ligne d'une liste \u00E0 puces";
    displayName: '\u00C9l\u00E9ment de liste';
    icon: 'list-ul';
    name: '\u00C9l\u00E9mentdeliste';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNumberedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_numbered_cards';
  info: {
    description: "Carte d'avantage : num\u00E9ro, titre et description courte";
    displayName: 'Carte num\u00E9rot\u00E9e';
    icon: 'list-ol';
    name: 'NumberedCard';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_headers';
  info: {
    description: 'Titre principal et chapeau de la page';
    displayName: 'En-t\u00EAte de page';
    icon: 'heading';
    name: 'En-t\u00EAtedepage';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPanel extends Struct.ComponentSchema {
  collectionName: 'components_shared_panels';
  info: {
    description: 'Regroupement de blocs';
    displayName: 'Panneau';
    icon: 'clone';
    name: 'Panneau';
  };
  attributes: {
    blocks: Schema.Attribute.Component<'shared.panel-block', true>;
  };
}

export interface SharedPanelBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_panel_blocks';
  info: {
    description: 'Un bloc titr\u00E9 du panneau Organisation';
    displayName: 'Bloc de panneau';
    icon: 'square';
    name: 'Blocdepanneau';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.list-item', true>;
    mobileTitle: Schema.Attribute.String;
    paragraphs: Schema.Attribute.Component<'shared.paragraph', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraphs';
  info: {
    description: 'Un paragraphe de texte';
    displayName: 'Paragraphe';
    icon: 'paragraph';
    name: 'Paragraphe';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedProgramDomain extends Struct.ComponentSchema {
  collectionName: 'components_shared_program_domains';
  info: {
    description: 'Un des trois domaines de la triple comp\u00E9tence';
    displayName: 'Domaine du programme';
    icon: 'sitemap';
    name: 'Domaineduprogramme';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedScheduleRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_schedule_rows';
  info: {
    description: 'Un jour de la semaine type';
    displayName: 'Ligne de planning';
    icon: 'calendar-day';
    name: 'Lignedeplanning';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    values: Schema.Attribute.Component<'shared.list-item', true>;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    description: "Titre, chapeau et bouton d'une section de page";
    displayName: 'En-t\u00EAte de section';
    icon: 'heading';
    name: 'SectionHeader';
  };
  attributes: {
    actionHref: Schema.Attribute.String;
    actionLabel: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSemester extends Struct.ComponentSchema {
  collectionName: 'components_shared_semesters';
  info: {
    description: "Un semestre et ses unit\u00E9s d'enseignement";
    displayName: 'Semestre';
    icon: 'calendar';
    name: 'Semestre';
  };
  attributes: {
    ariaLabel: Schema.Attribute.String;
    gridModifier: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    ues: Schema.Attribute.Component<'shared.ue', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Compte social : ic\u00F4ne, libell\u00E9 accessible et URL';
    displayName: 'R\u00E9seau social';
    icon: 'share-alt';
    name: 'SocialLink';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['facebook', 'linkedin', 'twitter']> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatsCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats_cards';
  info: {
    description: "Indicateurs d'insertion professionnelle";
    displayName: 'Carte de statistiques';
    icon: 'chart-bar';
    name: 'Cartedestatistiques';
  };
  attributes: {
    cardTitle: Schema.Attribute.String;
    href: Schema.Attribute.Text;
    intro: Schema.Attribute.Text;
    linkLabel: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    description: 'Une \u00E9tape de la proc\u00E9dure de candidature';
    displayName: '\u00C9tape';
    icon: 'shoe-prints';
    name: '\u00C9tape';
  };
  attributes: {
    duration: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedUe extends Struct.ComponentSchema {
  collectionName: 'components_shared_ues';
  info: {
    description: 'Une UE du programme';
    displayName: "Unit\u00E9 d'enseignement";
    icon: 'graduation-cap';
    name: "Unit\u00E9d'enseignement";
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    hours: Schema.Attribute.String;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    lines: Schema.Attribute.Component<'shared.list-item', true>;
    offset: Schema.Attribute.Enumeration<['top', 'bottom']>;
    short: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.alumni-filter': SharedAlumniFilter;
      'shared.contact-card': SharedContactCard;
      'shared.course-card': SharedCourseCard;
      'shared.cta-band': SharedCtaBand;
      'shared.definition': SharedDefinition;
      'shared.eligibility-panel': SharedEligibilityPanel;
      'shared.form-field': SharedFormField;
      'shared.formation-type': SharedFormationType;
      'shared.funding-column': SharedFundingColumn;
      'shared.funding-item': SharedFundingItem;
      'shared.hero': SharedHero;
      'shared.info-card': SharedInfoCard;
      'shared.lead': SharedLead;
      'shared.legal-section': SharedLegalSection;
      'shared.link': SharedLink;
      'shared.link-group': SharedLinkGroup;
      'shared.list-item': SharedListItem;
      'shared.media': SharedMedia;
      'shared.numbered-card': SharedNumberedCard;
      'shared.page-header': SharedPageHeader;
      'shared.panel': SharedPanel;
      'shared.panel-block': SharedPanelBlock;
      'shared.paragraph': SharedParagraph;
      'shared.program-domain': SharedProgramDomain;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.schedule-row': SharedScheduleRow;
      'shared.section-header': SharedSectionHeader;
      'shared.semester': SharedSemester;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-link': SharedSocialLink;
      'shared.stats-card': SharedStatsCard;
      'shared.step': SharedStep;
      'shared.ue': SharedUe;
    }
  }
}
