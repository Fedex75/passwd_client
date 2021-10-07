import React, { useEffect, useState } from 'react';
import Section from '../../components/Section';
import VaultHandler from '../../VaultHandler';

function Vault(props){
	const [vault, setVault] = useState(VaultHandler.vault);

	useEffect(() => {
		//subscribe to capital
	});

	const panels = [
		{ key: 'panel-1', title: 'Level 1', content: { content: 'Hola' } }
	];

	return (
		<Section>
			<div style={{color: 'white'}}>
				<div className="accordion">
					{
						vault.data.passwords.map((item, i) => (
							<div className="accordion__item">
								<div className="accordion__item__title">
									<i className="fas fa-angle-up"></i>
									{item.name}
								</div>
								<div className="accordion__item__content">
									{item.user}
								</div>
							</div>
						))
					}
				</div>
			</div>
		</Section>
	);
}

export default Vault;