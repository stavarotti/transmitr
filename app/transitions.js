export default function () {
  this.transition(
    this.fromRoute('my-stations'),
    this.toRoute('search'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  // Audio player - full view
  this.transition(
    this.hasClass('audio-player-full-view'),
    this.toValue(true),
    this.use('toUp', {
      duration: 500,
      easing: 'easeOutQuart'
    }),
    this.reverse('toDown', {
      duration: 500,
      easing: 'easeOutQuart'
    })
  );

  // Audio player - mini view
  this.transition(
    this.hasClass('audio-player-mini-view'),
    this.includingInitialRender(),
    this.toValue(true),
    this.use('toUp', {
      duration: 400,
      easing: 'easeInExpo'
    })
  );

  // Table view
  this.transition(
    this.hasClass('table-view-row-edit'),
    this.includingInitialRender(),
    this.toValue(true),
    this.use('fade', {
      duration: 100
    })
  )
}
