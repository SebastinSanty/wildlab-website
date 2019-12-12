import React from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import kebabCase from 'lodash/kebabCase';
import random from 'lodash/random';
import DataLink from '../Navigation/DataLink';
import withGoogleSheets from '../HOC/withGoogleSheets';
import withSection from '../HOC/withSection';
import { orderByDate } from '../../utils';

import './BigBanner.css';

const bigBannerImages = require
  .context('../../../public/banner/big')
  .keys()
  .map(i => i.replace('./', '/banner/big/'));

const bigBannerImage = bigBannerImages[random(0, bigBannerImages.length - 1)];

const BigBanner = ({ db: { home, news } }) => {
  return (
    <div
      className="section background_size_cover background_position_center banner-container"
      style={{ backgroundImage: `url('${bigBannerImage}')` }}
    >
      <div className="section bg_greydark_alpha_gradient_2">
        <div className="section height_570"></div>
        <div className="container clearfix">
          <div className="grid grid_12 custom-banner-title">
            <strong className="color_white font_size_60 first_font">
              {home[0].banner_big_text}
            </strong>
            <div className="section ">
              <strong className="color_white font_size_40 first_font">
                {home[0].banner_small_text}
              </strong>
            </div>
          </div>
          <div className="grid grid_12 custom-news-section">
            {orderByDate(news).map(n => (
              <p key={n.id}>
                <span className="news-title">{n.date}. </span>
                <DataLink to={`/news/${kebabCase(n.title)}-${n.id}`}>
                  {n.title}
                </DataLink>
              </p>
            ))}
          </div>
        </div>
        <div className="section height_50"></div>
      </div>
    </div>
  );
};

BigBanner.propTypes = {
  db: PropTypes.shape({
    news: PropTypes.arrayOf(PropTypes.object)
  })
};

export default flowRight(
  withGoogleSheets('home'),
  withGoogleSheets('news'),
  withSection('home-banner')
)(BigBanner);
