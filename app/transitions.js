export default function(){
  this.transition(
    this.fromRoute('stations.index'),
    this.toRoute('stations.add'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('stations.index'),
    this.toRoute('stations.station'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}