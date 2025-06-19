<template>
  <PageSection :title="title" without-top-body-margin>
    <AccordionText id="about-us" low-profile>
      Welcome to Inside Weddings, the insider’s guide to wedding inspiration.
      Our website features everything you need to know to plan your upcoming vow exchange.
      InsideWeddings.com also features countless inspiration from real weddings, rehearsal dinners,
      engagement sessions, bridal showers, and more. From luxurious affairs to backyard bashes,
      Inside Weddings is sure to inspire the celebration of your dreams. Browse inspiration,
      get advice from real couples (including your favorite celebrities), and share your own story once
      you’ve said “I do” by submitting your wedding event for a feature on InsideWeddings.com.
      <br><br>
      Our extensive inspiration Galleries and Photo Library allow you to browse beautiful flower bouquets,
      wedding dresses, bridesmaid dresses, ceremony and reception décor, wedding cakes, engagement rings,
      invitations, and so much more. Sort wedding images by color, category, or keyword to discover the very best
      inspiration for your wedding day, no matter what color palette or theme you desire for your event.
      Share preferred images with your friends by adding your favorite inspirational pictures to your social media
      pages, including Facebook and Pinterest. Also get up-to-the-minute wedding News including the hottest
      bridesmaid gift ideas, celebrity style, fashion tips, insider interviews, the latest beauty products, travel
      and honeymoon deals, and more. Etiquette expert Anna Post (Emily Post’s great-great-granddaughter) answers
      your etiquette questions and the wedding world’s celebrity planners, photographers, invitation designers,
      florists, and more share their expertise with you to help you plan your wedding day.
      <br><br>
      Planning a local or destination wedding? We can help! Use our extensive Directory of vendors and venues
      during your wedding planning to help you find the perfect photographers, wedding planners, florists, and more.
      Located all across the country and often willing to travel, our Editors Circle members are dedicated to
      providing brides and grooms with the best products and services, and they will do their best to check off
      every item on your wedding checklist to make your event extraordinary. If you’re a talented wedding professional,
      we want to meet you! We encourage skilled wedding vendors and professionals to create a business account on
      InsideWeddings.com and even apply for an Editors Circle membership.
    </AccordionText>
  </PageSection>
</template>

<script setup>
const title = 'About Us'
</script>

<style scoped lang="scss">
#accordion-text::first-letter {
  initial-letter: 2;
}

#about-us {
  margin: 0 auto 0 !important;
  white-space: initial;
  text-align: center;

  ::v-deep p {
    font-size: 15px;
    line-height: 1.5rem;
    text-align: justify;
    color: #222;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
