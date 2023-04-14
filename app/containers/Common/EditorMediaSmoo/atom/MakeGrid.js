import React from 'react';
import PropTypes from 'prop-types';
import AtomHidden from './Hidden';
import AtomGrid from './Grid';
import AtomDivider from './Divider';

/* tạo lưới các thành phần, hỗ trợ thêm vạch chia */
/* 
******
cách nâng cấp MakeGrid, chuyển các props sau: 
  =>  elements
      allItemProps
      itemComponent
      itemProps
  thành các props tương ứng:
  =>  grids
      allGridProps
      children
      props
****** 
*/

export default function MakeGrid({ grids, allGridProps, containerProps }) {
  return (
    <AtomGrid container spacing={2} {...containerProps}>
      {grids.map((grid, index) => {
        const key = index;

        return (
          <React.Fragment key={key}>
            <AtomGrid item {...grid.props || allGridProps}>
              {grid.children}
            </AtomGrid>
            {grid.divider && (
              <AtomHidden mdDown>
                <AtomGrid item>
                  <AtomDivider orientation="vertical" />
                </AtomGrid>
              </AtomHidden>
            )}
          </React.Fragment>
        );
      })}
    </AtomGrid>
  );
}
MakeGrid.propTypes = {
  grids: PropTypes.array, // các grid items
  allGridProps: PropTypes.object, // áp dụng cho toàn bộ grids
  containerProps: PropTypes.object, // grid container
};

MakeGrid.defaultProps = {
  grids: [
    {
      props: { xs: 12, sm: 6, md: 4, lg: 3, xl: true },
      children: 'Grid item',
      divider: true,
    },
  ],
};
