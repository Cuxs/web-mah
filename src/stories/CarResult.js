import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import style from '../Styles/carResult';
import { thousands } from '../Modules/functions';

export default class CarResult extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }
  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.photoGalery.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.photoGalery.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  featuredOrSold() {
    if (this.props.data.CurrentState !== null) {
      const state = this.props.data.CurrentState.stateName;

      if (state === 'Destacada') {
        return <p className="item-state">DESTACADO</p>;
      }
      if (state === 'Vendida') {
        return <p className="sold item-state">VENDIDO</p>;
      }
    }
    return true;
  }

  renderName() {
    if (this.props.data.User === null) {
      return 'PARTICULAR';
    }
    if (this.props.data.User.isAgency) {
      return this.props.data.User.agencyName;
    }
    return this.props.data.User.name;
  }

  render() {
    const { activeIndex } = this.state;
    const slides = this.props.photoGalery.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img
          style={{ position: 'relative', width: '100%', height: 'auto' }}
          src={item.src}
          alt={item.altText}
        />
      </CarouselItem>
    ));
    return (

      <div className="item-car">
        <a href={`/carDetail?publication_id=${this.props.data.id}`}>
          <div className="photos">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              interval={10000}
            >
              <CarouselIndicators
                items={this.props.photoGalery}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}

              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
            {this.featuredOrSold()}
          </div>
          <div className="item-data">
            <p className="item-category">
              <span>{this.renderName()}</span>
            </p>
            <p className="item-name">
              <strong>{this.props.data.group}</strong>
            </p>
            <p className="item-description">{this.props.data.modelName}</p>
            <p className="item-price">
              <strong>{this.props.data.price ? `$${thousands(this.props.data.price, 2, ',', '.')}` : 'Consultar'}</strong>
            </p>
            <small className="item-year">{this.props.data.year} - {`${thousands(this.props.data.kms, 0, ',', '.')} kms.`}</small>
          </div>
        </a>
      </div>
    );
  }
}
