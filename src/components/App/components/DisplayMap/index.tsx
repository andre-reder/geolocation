/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef } from 'react';
import employeeIcon from '../../../../assets/images/icons/employee.svg';
import OpacityAnimation from '../../../OpacityAnimation';
import { DataAfterCoordsProcessed } from '../../types';

interface DisplayMapInterface {
  data: DataAfterCoordsProcessed[];
}

type CoordType = { lat: string, lng: string };

export default function DisplayMap({ data }: DisplayMapInterface) {
	const mapRef = useRef(null);

	useLayoutEffect(() => {
		const employees = data.map((i) => (
			{
				lat: i.lat,
				lng: i.lng,
				name: i.name,
			}
		));

		if (!mapRef.current) return undefined;
		const { H } = window;
		const platform = new H.service.Platform({
			apikey: 'j_2nd1oo9KEEZjtXMr00yXv-lGuogKpehnyWQfs-zJM',
		});
		const defaultLayers = platform.createDefaultLayers();
		// Create an instance of the map
		const mapInstance = new H.Map(
			mapRef.current,
			defaultLayers.vector.normal.map,
			{
				center: { lat: employees[0]?.lat ?? 0, lng: employees[0]?.lng ?? 0 },
				zoom: 10.5,
				pixelRatio: window.devicePixelRatio || 1,
			},
		);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapInstance));
		const ui = H.ui.UI.createDefault(mapInstance, defaultLayers);

		function addMarkersToMap(map: any) {
			employees.forEach((employee) => {
				const employeeIconHere = new H.map.Icon(employeeIcon);
				const employeeCoord = { lat: employee.lat, lng: employee.lng };
				const employeeMarker = new H.map.Marker(employeeCoord, { icon: employeeIconHere });

				function addMarkerToGroup(group: any, coordinate: CoordType, html: string) {
					const marker = new H.map.Marker(coordinate, { icon: employeeIconHere });
					// add custom data to the marker
					marker.setData(html);
					group.addObject(marker);
				}

				function addInfoBubble(mp: any) {
					const group = new H.map.Group();
					mp.addObject(group);

					// add 'tap' event listener, that opens info bubble, to the group
					group.addEventListener('tap', (evt: any) => {
						// event target is the marker itself, group is a parent event target
						// for all objects that it contains
						const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
							// read custom data
							content: evt.target.getData(),
						});
						// show info bubble
						ui.addBubble(bubble);
					}, false);

					addMarkerToGroup(
						group,
						employeeCoord,
						`<div style="
                min-inline-size: max-content;
            ">
              ${employee.name}
            </div>`,
					);
				}
				map.addObject(employeeMarker);
				addInfoBubble(map);
			});
		}

		addMarkersToMap(mapInstance);

		return () => {
			mapInstance.dispose();
		};
	}, [data, mapRef]);

	return (
		<OpacityAnimation delay={0.1}>
			<div ref={mapRef} style={{ height: '500px', width: '100%' }} />
		</OpacityAnimation>
	);
}
